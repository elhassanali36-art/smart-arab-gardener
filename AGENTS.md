<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep animal knowledge in a browser-safe type/breed catalog, separate from existing authenticated farm inventory; educational browsing must not require an account or change inventory schema.
- Use the existing `/livestock` route with validated search state for type, breed, comparison and inventory navigation; preserve browser history and the current public URL without replacing authentication.
- Store downloaded animal photographs as Lovable asset pointers with source attribution and explicitly label species-level fallback photographs; never label an unverified image as a specific breed.
