// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { config as baseConfig } from "@workspace/eslint-config/base"

/**
 * Configuração ESLint para a raiz do monorepo.
 *
 * Este arquivo aplica-se apenas aos arquivos de configuração na raiz.
 * Apps e packages têm suas próprias configurações.
 *
 * @type {import("eslint").Linter.Config}
 */
export default [...baseConfig, {
    // Ignorar apps e packages (eles têm suas próprias configurações)
    ignores: [
        "apps/**",
        "packages/**",
    ],
}, ...storybook.configs["flat/recommended"]];
