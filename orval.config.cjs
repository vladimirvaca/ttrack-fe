module.exports = {
  ttrack: {
    input: {
      target: 'http://localhost:8080/swagger/ttrack-be-1.0.yml',
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
