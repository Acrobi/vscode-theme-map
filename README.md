# VSCode Theme Map Plugin

## Overview

`@acrobi/vscode-theme-map` is a powerful Tailwind CSS plugin that seamlessly integrates VS Code theme variables with dynamic styling, providing a flexible and extensible theming solution.

## Features

- 🎨 Dynamic theme variable extraction from VS Code
- 🔄 Intelligent theme mapping for Tailwind CSS
- 🧩 Supports Shadcn UI and framework-agnostic design
- 🚀 Minimal runtime overhead
- 🔧 Highly configurable

## Installation

```bash
npm install @acrobi/vscode-theme-map tailwindcss
```

## Usage

### Tailwind Configuration

```typescript
// tailwind.config.ts
import { vsCodeTailwindPlugin } from '@acrobi/vscode-theme-map';

export default {
  content: [
    // Your project's file paths
  ],
  plugins: [
    vsCodeTailwindPlugin({
      // Optional custom configuration
      excludeVariables: ['debug', 'test'],
      customMappings: {
        // User-defined variable mappings
      },
    }),
  ],
};
```

### Shadcn UI Integration

```typescript
import { createShadcnThemeVariants } from '@acrobi/vscode-theme-map';

const themeVariants = createShadcnThemeVariants();

// Use in your components
const Button = themeVariants.button();
```

## Configuration Options

- `excludeVariables`: Array of variable names to ignore
- `customMappings`: Override default theme variable mappings

## Performance

- Lazy variable extraction
- Minimal runtime overhead
- Efficient CSS variable processing

## Compatibility

- Supports multiple VS Code versions
- Works with latest Tailwind CSS
- React and framework-agnostic design

## Future Enhancements

- Runtime theme switching
- More granular theme mappings
- Advanced component styling utilities

## Contributing

Contributions are welcome! Please check our [Contributing Guidelines](CONTRIBUTING.md).

## License

MIT License

## Contact

Maintained by the Acrobi Team