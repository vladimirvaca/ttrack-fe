module.exports = {
  ttrack: {
    input: {
      target: 'http://localhost:5173/api/swagger/ttrack-be-0.2.15.yml',
    },
    output: {
      mode: 'tags-split',
      client: 'react-query',
      target: 'src/api/generated',
      schemas: 'src/api/generated/model',
      tsconfig: {
        compilerOptions: {
          target: 'ES2022',
        },
      },
      clean: true,
      override: {
        mutator: {
          path: './src/api/http.ts',
          name: 'httpClient',
        },
      },
    },
  },
};
