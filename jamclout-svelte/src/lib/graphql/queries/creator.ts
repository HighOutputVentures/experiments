import { gql } from '@apollo/client/core';

export const GET_CREATOR_POSTS_WITHOUT_AUTH = gql`
	query GetCreatorPostsWithOutAuth($username: String!) {
		creatorAccount(username: $username) {
			following
			username
			id
			image_next {
				id
				url
				blurhash
			}
			posts {
				edges {
					node {
						... on Post {
							id
							message
							embed
							thumbnail {
								id
								url
								blurhash
							}
							contents {
								id
								url
								mimetype
								blurhash
								thumbnail {
									id
									url
								}
							}
							likesCount
							comments {
								totalCount
							}
							visibilityType
						}
					}
				}
			}
		}
	}
`;
