// src/core/variable-extractor.ts
var VSCodeThemeVariableExtractor = class {
  // Placeholder implementation based on the original document
  extractThemeVariables() {
    return {};
  }
  processVariables(rawVariables) {
    return Object.fromEntries(
      Object.entries(rawVariables).filter(([key, value]) => value && !key.includes("debug")).map(([key, value]) => [key.replace(/\./g, "-"), value])
    );
  }
};

// src/core/plugin.ts
import plugin from "tailwindcss/plugin";

// src/core/theme-mapper.ts
var ThemeMapper = class {
  constructor(userOptions = {}) {
    this.userOptions = userOptions;
    this.defaultMappings = {
      colorMap: {
        // Default color transformations
        "button-background": "primary",
        "editor-background": "background",
        "editor-foreground": "foreground"
      },
      structuralMap: {
        // Mapping for non-color properties
        "border-radius": "rounded",
        "font-size": "text"
      }
    };
  }
  mapToTailwindTheme(variables) {
    return {
      colors: this.mapColors(variables),
      borderRadius: this.mapBorderRadius(variables)
    };
  }
  mapColors(variables) {
    return Object.fromEntries(
      Object.entries(variables).filter(
        ([key]) => key.includes("background") || key.includes("foreground")
      ).map(([key, value]) => [
        this.defaultMappings.colorMap[key] || key,
        value
      ])
    );
  }
  mapBorderRadius(variables) {
    const radiusVariables = Object.entries(variables).filter(
      ([key]) => key.includes("border-radius")
    );
    return Object.fromEntries(
      radiusVariables.map(([key, value]) => [
        this.defaultMappings.structuralMap[key] || key,
        value
      ])
    );
  }
};

// src/core/plugin.ts
function vsCodeTailwindPlugin(options = {}) {
  const extractor = new VSCodeThemeVariableExtractor();
  const mapper = new ThemeMapper(options);
  return plugin(
    function({ addBase, theme, config }) {
      const rawVariables = extractor.extractThemeVariables();
      const processedVariables = extractor.processVariables(rawVariables);
      const tailwindTheme = mapper.mapToTailwindTheme(processedVariables);
      addBase({
        ":root": Object.fromEntries(
          Object.entries(tailwindTheme.colors).map(([key, value]) => [
            `--tw-vscode-${key}`,
            value
          ])
        )
      });
      return {
        theme: {
          extend: {
            colors: tailwindTheme.colors,
            borderRadius: tailwindTheme.borderRadius
          }
        }
      };
    },
    {
      // Plugin configuration and metadata
      theme: {
        extend: {}
      }
    }
  );
}

// src/integrations/shadcn-adapter.ts
import { cva } from "class-variance-authority";
function createShadcnThemeVariants() {
  return {
    button: cva("inline-flex items-center justify-center", {
      variants: {
        variant: {
          default: "bg-vscode-button-background text-vscode-button-foreground",
          secondary: "bg-vscode-button-secondaryBackground text-vscode-button-secondaryForeground",
          outline: "border border-vscode-border"
        },
        size: {
          default: "h-10 px-4 py-2",
          sm: "h-9 rounded-md px-3",
          lg: "h-11 rounded-md px-8"
        }
      },
      defaultVariants: {
        variant: "default",
        size: "default"
      }
    })
  };
}

// src/index.ts
var vscodeThemeMap = {
  VSCodeThemeVariableExtractor,
  vsCodeTailwindPlugin,
  ThemeMapper,
  createShadcnThemeVariants
};
var src_default = vscodeThemeMap;
export {
  ThemeMapper,
  VSCodeThemeVariableExtractor,
  createShadcnThemeVariants,
  src_default as default,
  vsCodeTailwindPlugin
};
