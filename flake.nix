{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs?ref=nixos-26.05";
  };

  outputs =
    { nixpkgs, ... }:
    let
      pkgs = nixpkgs.legacyPackages.x86_64-linux;
    in
    {
      packages.x86_64-linux.default = pkgs.stdenv.mkDerivation (finalAttrs: {
        pname = "wttrbar";
        version = "1.0.2";
        src = pkgs.lib.cleanSource ./.;

        nativeBuildInputs = with pkgs; [
          nodejs
          pnpmConfigHook
          pnpm
          makeWrapper
        ];

        pnpmDeps = pkgs.fetchPnpmDeps {
          inherit (finalAttrs) pname version src;
          fetcherVersion = 3;
          hash = "sha256-cMIRpphc3h0CxmQ0TxH/YNGKBKwg8LYbnaam4dIEyLY=";
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
          pnpm
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
