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

export const GET_CREATOR_POST_WITHOUT_AUTH = gql`
	query GetCreatorPostWithOutAuth($id: ID!) {
		node(id: $id) {
			... on Post {
				id
				creator {
					id
					username
					emailAddress
					username
					image_next {
						id
						url
						blurhash
					}
				}
				message
				likesCount
				createdAt
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
					thumbnail {
						id
						url
					}
				}
				comments {
					edges {
						node {
							... on Comment {
								account {
									... on CreatorAccount {
										id
										username
										image_next {
											id
											url
											blurhash
										}
									}
									... on FollowerAccount {
										id
										emailAddress
										username
									}
								}
								id
								createdAt
								message
							}
						}
					}
					totalCount
				}
			}
		}
	}
`;
