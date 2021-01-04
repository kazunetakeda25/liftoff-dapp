import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { TokenSale, Maybe } from 'utils/types';

const query = gql`
  query GetProject($id: ID!) {
    tokenSale(id: $id) {
      id
      tokenId
      ipfsHash
      startTime
      endTime
      softCap
      hardCap
      totalSupply
      totalIgnited
      rewardSupply
      dev
      deployed
      pair
      isSparked
      name
      symbol
    }
  }
`;

type GraphResponse = {
  tokenSale: Maybe<TokenSale>;
};

export const useProject = (tokeSaleId: string) => {
  const [project, setProject] = useState<Maybe<TokenSale>>(null);

  const { data, error, loading } = useQuery<GraphResponse>(query, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    variables: {
      id: tokeSaleId
    }
  });

  useEffect(() => {
    if (!tokeSaleId) setProject(null);
  }, [tokeSaleId]);

  if (data && data.tokenSale) {
    setProject(data.tokenSale);
  }

  return { project, error, loading };
};
