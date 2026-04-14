"""Citation Generator Router"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
import httpx

router = APIRouter(prefix="/citation", tags=["Citation Generator"])

CITATION_FORMATS = ["apa7", "mla9", "chicago", "ieee", "harvard"]
SOURCE_TYPES = ["journal_article", "book", "website", "conference_paper"]

class CitationRequest(BaseModel):
    source_type: str  # journal_article | book | website | conference_paper
    title: str = ""
    authors: str = ""  # Comma-separated: "Smith, John; Doe, Jane"
    year: str = ""
    doi: str = ""
    url: str = ""
    journal: str = ""
    volume: str = ""
    issue: str = ""
    pages: str = ""
    publisher: str = ""
    access_date: str = ""  # For websites
    format: str = "apa7"  # apa7 | mla9 | chicago | ieee | harvard

class CitationResponse(BaseModel):
    citation: str
    reference: str
    warnings: list[str] = []
    credits_used: int = 3

@router.post("/", response_model=CitationResponse)
async def generate_citation(req: CitationRequest):
    if not req.title.strip():
        raise HTTPException(status_code=400, detail="Title is required")

    if req.format not in CITATION_FORMATS:
        raise HTTPException(status_code=400, detail=f"Format must be one of: {CITATION_FORMATS}")

    warnings = []

    # Try to fetch DOI metadata if DOI is provided
    doi_metadata = {}
    if req.doi:
        try:
            async with httpx.AsyncClient() as client:
                resp = await client.get(
                    f"https://api.crossref.org/works/{req.doi}",
                    headers={"Accept": "application/json"},
                    timeout=10.0
                )
                if resp.status_code == 200:
                    data = resp.json().get("message", {})
                    doi_metadata = {
                        "title": data.get("title", [""])[0] if data.get("title") else "",
                        "authors": "; ".join([
                            f"{a.get('family', '')}, {a.get('given', '')}"
                            for a in data.get("author", [])
                        ]),
                        "year": str(data.get("published-print", data.get("published-online", {})).get("date-parts", [[None]])[0][0]) if data.get("published-print", data.get("published-online")) else "",
                        "journal": data.get("container-title", [""])[0] if data.get("container-title") else "",
                        "volume": data.get("volume", ""),
                        "issue": data.get("issue", ""),
                        "pages": data.get("page", ""),
                        "publisher": data.get("publisher", "")
                    }
                    # Fill in missing fields from DOI
                    req.title = req.title or doi_metadata.get("title", "")
                    req.authors = req.authors or doi_metadata.get("authors", "")
                    req.year = req.year or doi_metadata.get("year", "")
                    req.journal = req.journal or doi_metadata.get("journal", "")
                    req.volume = req.volume or doi_metadata.get("volume", "")
                    req.issue = req.issue or doi_metadata.get("issue", "")
                    req.pages = req.pages or doi_metadata.get("pages", "")
                    req.publisher = req.publisher or doi_metadata.get("publisher", "")
        except Exception:
            warnings.append("Could not fetch DOI metadata. Please fill in fields manually.")

    # Format citation locally based on format type
    citation, reference = format_citation(req, doi_metadata, warnings)

    return CitationResponse(
        citation=citation,
        reference=reference,
        warnings=warnings
    )


def format_citation(req, doi_metadata, warnings):
    """Local citation formatting (simplified v1)"""
    authors = req.authors or "Unknown Author"
    year = req.year or "n.d."
    title = req.title
    url = req.url
    doi = req.doi
    journal = req.journal
    volume = req.volume
    issue = req.issue
    pages = req.pages
    publisher = req.publisher
    access_date = req.access_date

    # Check missing fields by format
    if not req.authors:
        warnings.append("Authors field is empty. Please verify the citation.")

    if req.format == "apa7":
        citation = f"{authors} ({year}). {title}."
        if journal:
            citation += f" *{journal}*"
            if volume:
                citation += f", *{volume}*"
                if issue:
                    citation += f"({issue})"
            if pages:
                citation += f", {pages}"
        if doi:
            citation += f" https://doi.org/{doi}"
        elif url:
            citation += f" {url}"
        reference = citation

    elif req.format == "mla9":
        citation = f"{authors}. \"{title}.\""
        if journal:
            citation += f" *{journal}*,"
            if volume:
                citation += f" vol. {volume},"
            if issue:
                citation += f" no. {issue},"
            citation += f" {year},"
            if pages:
                citation += f" pp. {pages}."
        if url:
            citation += f" {url}."
        if access_date:
            citation += f" Accessed {access_date}."
        reference = citation

    elif req.format == "ieee":
        authors_ieee = authors.replace("; ", ", ").replace(", ", ", ", 1) if "," in authors else authors
        citation = f"{authors_ieee}, \"{title},\""
        if journal:
            citation += f" *{journal}*,"
        if volume:
            citation += f" vol. {volume},"
        if issue:
            citation += f" no. {issue},"
        if pages:
            citation += f" pp. {pages},"
        citation += f" {year}."
        if doi:
            citation += f" doi: {doi}."
        reference = citation

    elif req.format == "harvard":
        citation = f"{authors} ({year}) '{title}',"
        if journal:
            citation += f" *{journal}*,"
            if volume:
                citation += f" {volume}"
                if issue:
                    citation += f"({issue})"
            if pages:
                citation += f", pp. {pages}."
        if url:
            citation += f" Available at: {url}"
            if access_date:
                citation += f" (Accessed: {access_date})"
        reference = citation

    else:  # chicago
        citation = f"{authors}. {title}."
        if journal:
            citation += f" *{journal}*"
            if volume:
                citation += f" {volume}"
                if issue:
                    citation += f", no. {issue}"
            citation += f" ({year})"
            if pages:
                citation += f": {pages}"
            citation += "."
        if url:
            citation += f" {url}."
        reference = citation

    return citation, reference
