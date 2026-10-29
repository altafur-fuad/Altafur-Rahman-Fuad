# Research Publications & Manuscripts

This directory is reserved for approved, publicly released research paper PDFs.

## Expected Future Paper File Path

- **CrossMamba-Agri Paper**:
  `assets/papers/crossmamba-agri-paper.pdf`

## Current Status

- **Status**: Research in Progress · 1 Ongoing Project
- **Published Papers**: 0 Currently
- **Public PDF**: Coming soon upon completion of peer review and formal publication.

## How to Add the Paper When Ready

1. Once the manuscript has been accepted or approved for preprint release, place the PDF file at:
   `assets/papers/crossmamba-agri-paper.pdf`
2. Open `src/data/research.json` and update the publication details:
   - Set `"isPublished": true`
   - Update `"statusBadge"` (e.g., `"Published"`, `"Preprint"`, or `"Accepted"`)
   - Add the official `"doi"` and/or `"publisherUrl"`
   - Add `"venue"` (conference or journal name) and `"year"`
3. Run the build command:
   ```bash
   npm run build
   ```
4. Commit and push the changes. The download button and active status badge will activate automatically on the live portfolio.
