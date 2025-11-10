import * as tailwindcss_types_config from 'tailwindcss/types/config';
import * as class_variance_authority_dist_types from 'class-variance-authority/dist/types';

declare class VSCodeThemeVariableExtractor {
    extractThemeVariables(): Record<string, string>;
    processVariables(rawVariables: Record<string, string>): Record<string, string>;
}

declare function vsCodeTailwindPlugin(options?: Record<string, unknown>): {
    handler: tailwindcss_types_config.PluginCreator;
    config?: Partial<tailwindcss_types_config.Config>;
};

declare class ThemeMapper {
    private userOptions;
    private defaultMappings;
    constructor(userOptions?: Record<string, unknown>);
    mapToTailwindTheme(variables: Record<string, string>): {
        colors: Record<string, string>;
        borderRadius: Record<string, string>;
    };
    private mapColors;
    private mapBorderRadius;
}

declare function createShadcnThemeVariants(): {
    button: (props?: ({
        variant?: "default" | "secondary" | "outline" | null | undefined;
        size?: "default" | "sm" | "lg" | null | undefined;
    } & class_variance_authority_dist_types.ClassProp) | undefined) => string;
};

declare const vscodeThemeMap: {
    VSCodeThemeVariableExtractor: typeof VSCodeThemeVariableExtractor;
    vsCodeTailwindPlugin: typeof vsCodeTailwindPlugin;
    ThemeMapper: typeof ThemeMapper;
    createShadcnThemeVariants: typeof createShadcnThemeVariants;
};

export { ThemeMapper, VSCodeThemeVariableExtractor, createShadcnThemeVariants, vscodeThemeMap as default, vsCodeTailwindPlugin };
