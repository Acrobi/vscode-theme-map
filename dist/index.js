"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  ThemeMapper: () => ThemeMapper,
  VSCodeThemeVariableExtractor: () => VSCodeThemeVariableExtractor,
  createShadcnThemeVariants: () => createShadcnThemeVariants,
  default: () => src_default,
  vsCodeTailwindPlugin: () => vsCodeTailwindPlugin
});
module.exports = __toCommonJS(src_exports);

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
var import_plugin = __toESM(require("tailwindcss/plugin"));

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
  return (0, import_plugin.default)(
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
var import_class_variance_authority = require("class-variance-authority");
function createShadcnThemeVariants() {
  return {
    button: (0, import_class_variance_authority.cva)("inline-flex items-center justify-center", {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ThemeMapper,
  VSCodeThemeVariableExtractor,
  createShadcnThemeVariants,
  vsCodeTailwindPlugin
});
