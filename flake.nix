{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.11";
  };

  outputs =
    { nixpkgs, ... }:
    let
      pkgs = nixpkgs.legacyPackages.x86_64-linux;
    in
    {
      packages.x86_64-linux.default = pkgs.stdenv.mkDerivation (finalAttrs: {
        pname = "wttrbar";
        version = "1.0.0";
        src = pkgs.lib.cleanSource ./.;

        nativeBuildInputs = [
          pkgs.nodejs
          pkgs.pnpmConfigHook
          pkgs.pnpm_10
          pkgs.makeWrapper
        ];

        pnpmDeps = pkgs.fetchPnpmDeps {
          inherit (finalAttrs) pname version src;
          fetcherVersion = 3;
          hash = "sha256-AgO4en4ZEWpExzEroFpdPb2yBprY2hODwxTK+xSMPzk=";
        };

        buildPhase = ''
          pnpm run build
        '';

        installPhase = ''
          mkdir -p $out/lib/wttrbar $out/bin
          cp -r dist node_modules $out/lib/wttrbar/
          makeWrapper ${pkgs.nodejs}/bin/node $out/bin/wttrbar \
            --add-flags "$out/lib/wttrbar/dist/index.js"
        '';
      });

      devShells.x86_64-linux.default = pkgs.mkShell {
        buildInputs = with pkgs; [
          nodejs
          pnpm_10
          biome
        ];

        shellHook = ''
          # Generate Claude Code skills for Nix-provided binaries
          mkdir -p .claude/skills/biome-nix

          cat > .claude/skills/biome-nix/SKILL.md <<'SKILL'
          ---
          name: biome
          description: Format and lint code with Biome. Use for all formatting and linting tasks.
          allowed-tools: Bash(biome *)
          ---

          Use the `biome` binary directly from PATH for formatting and linting. Never use `pnpm exec biome` or `npx biome`.

          - Format: `biome format --write <file>`
          - Lint: `biome lint --write <file>`
          - Both: `biome check --write <file>`
          SKILL
        '';
      };
    };
}
