import { ThemeMapper } from '../src/core/theme-mapper';

describe('ThemeMapper', () => {
  let mapper: ThemeMapper;

  beforeEach(() => {
    mapper = new ThemeMapper();
  });

  test('mapToTailwindTheme handles color mappings', () => {
    const variables = {
      'button-background': '#0066CC',
      'editor-background': '#FFFFFF',
      'editor-foreground': '#000000'
    };

    const theme = mapper.mapToTailwindTheme(variables);

    expect(theme.colors).toEqual({
      'primary': '#0066CC',
      'background': '#FFFFFF',
      'foreground': '#000000'
    });
  });

  test('mapToTailwindTheme handles border radius mappings', () => {
    const variables = {
      'border-radius-small': '4px',
      'border-radius-large': '12px'
    };

    const theme = mapper.mapToTailwindTheme(variables);

    expect(theme.borderRadius).toEqual({
      'border-radius-small': '4px',
      'border-radius-large': '12px'
    });
  });
});