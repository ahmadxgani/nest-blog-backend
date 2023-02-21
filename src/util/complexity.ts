import { Plugin } from '@nestjs/apollo';
import {
  ApolloServerPlugin,
  GraphQLServerListener,
  GraphQLServiceContext,
} from 'apollo-server-plugin-base';
import { GraphQLRequestListener } from 'apollo-server-plugin-base/src';
import { GraphQLError, GraphQLSchema } from 'graphql';
import {
  fieldExtensionsEstimator,
  getComplexity,
  simpleEstimator,
} from 'graphql-query-complexity';

@Plugin()
export class ComplexityPlugin implements ApolloServerPlugin {
  private schema: GraphQLSchema;

  async serverWillStart(
    service: GraphQLServiceContext,
  ): Promise<GraphQLServerListener | void> {
    this.schema = service.schema;
  }

  async requestDidStart(): Promise<GraphQLRequestListener | void> {
    const maxComplexity = 5;

    return {
      didResolveOperation: async ({ request, document }) => {
        const complexity = getComplexity({
          schema: this.schema,
          operationName: request.operationName,
          query: document,
          variables: request.variables,
          estimators: [
            fieldExtensionsEstimator(),
            simpleEstimator({ defaultComplexity: 1 }),
          ],
        });

        if (complexity > maxComplexity) {
          throw new GraphQLError(
            `Query is too complex: ${complexity}. Maximum allowed complexity: ${maxComplexity}`,
          );
        }
      },
    };
  }
}
