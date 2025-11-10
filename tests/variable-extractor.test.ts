import { VSCodeThemeVariableExtractor } from '../src/core/variable-extractor';

describe('VSCodeThemeVariableExtractor', () => {
  let extractor: VSCodeThemeVariableExtractor;

  beforeEach(() => {
    extractor = new VSCodeThemeVariableExtractor();
  });

  test('extractThemeVariables returns an empty object', () => {
    const variables = extractor.extractThemeVariables();
    expect(variables).toEqual({});
  });

  test('processVariables filters out debug variables', () => {
    const rawVariables = {
      'debug.test': 'debugValue',
      'editor.background': '#FFFFFF',
      'button.background': '#000000'
    };

    const processedVariables = extractor.processVariables(rawVariables);

    expect(processedVariables).toEqual({
      'editor-background': '#FFFFFF',
      'button-background': '#000000'
    });
  });
});