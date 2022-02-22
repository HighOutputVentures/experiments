import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Fade,
  Grid,
  Spinner,
  Tooltip,
  Avatar,
  Flex,
} from '@chakra-ui/react'
import { useMutation } from '@apollo/client'
import { DELETE_PROJECT } from '@graphql/mutations/project'
import { DeleteProjectVariables, DeleteProject } from '../types/DeleteProject'
import { useCollectionDetail } from '@hooks/useGetCollectionDetail'
import { FC, useState } from 'react'
import { useRouter } from 'next/router'

// const IMAGE =
//   'https://lh3.googleusercontent.com/U584T8SUu66g60cVtv3z7k-q7UJNKoIRjZISmxo6AewpGl3pNN9uk3ZB804qoNPhvqVVYR5ecA5AiUJ2RYvMYyg6GWWg-jtNSsa1eg=s2500'

interface ProjectCardProps {
  id: string
  name: string
  description: string
  address: string
  refetch: () => void
}

export const ProjectCard: FC<ProjectCardProps> = ({ id, name, description, address, refetch }) => {
  const { data, isLoading } = useCollectionDetail(address)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [deleteProject] = useMutation<DeleteProject, DeleteProjectVariables>(DELETE_PROJECT, {
    onCompleted: () => {
      refetch()
      setIsDeleting(true)
    },
  })

  const router = useRouter()

  const onDelete = async () => {
    setIsDeleting(true)
    await deleteProject({
      variables: {
        request: {
          id,
        },
      },
    })
  }

  // if (data) {
  return (
    <Fade in>
      <Center
        py={12}
        onDoubleClick={(e) => {
          e.stopPropagation()
          router.push(`/invite/${id}`)
        }}
      >
        <Box role={'group'} p={6} w={'330px'} boxShadow={'md'} rounded={'lg'} pos={'relative'} zIndex={1} bg="white">
          <Box
            rounded={'lg'}
            pos={'relative'}
            height={'240px'}
            _groupHover={{
              cursor: 'pointer',
              _after: {
                filter: 'blur(20px)',
              },
            }}
          >
            {!isLoading && (
              <Box>
                {isDeleting && (
                  <Box borderRadius="6px" pos="absolute" bg="black" opacity={0.8} h="full" w="full" zIndex={10}>
                    <Grid placeItems="center" h="full">
                      <Spinner color="red" size="xl" />
                    </Grid>
                  </Box>
                )}

                <Box
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete()
                  }}
                  bg="red"
                  pos="absolute"
                  right="-6px"
                  top="-6px"
                  borderRadius="full"
                  px="6px"
                  py="-2px"
                  fontSize="xs"
                  textColor="white"
                  fontWeight="bold"
                  visibility="hidden"
                  zIndex={12}
                  _groupHover={{
                    visibility: 'visible',
                  }}
                >
                  x
                </Box>
                <Image
                  shadow={'xl'}
                  rounded={'lg'}
                  height={230}
                  width={282}
                  objectFit={'cover'}
                  src={data?.collection.banner_image_url}
                  fallbackSrc={'/placeholder.png'}
                />
              </Box>
            )}
          </Box>
          <Grid gridTemplateRows="3fr 1fr">
            <Stack align={'start'} gap="1px" mt="25px">
              <Flex
                pl="10px"
                w="full"
                flexDir="column"
                justifyContent="center"
                alignItems="center"
                css={{
                  gap: '10px',
                }}
                wrap="wrap"
              >
                <Heading fontSize={'18px'} fontWeight={600} isTruncated noOfLines={2}>
                  {name}
                </Heading>
                <Text
                  color={'gray.500'}
                  fontWeight="light"
                  fontSize={'xs'}
                  textTransform="lowercase"
                  textAlign="center"
                >
                  {description}
                </Text>
              </Flex>
              {/* <Text
                  color={'gray.500'}
                  fontWeight="light"
                  fontSize={'xs'}
                  textTransform="lowercase"
                  textAlign="center"
                >
                  {`/${id}`}
                </Text> */}
            </Stack>

            <Stack align={'center'}>
              <Text fontSize="10px" color="gray.500">
                {/* NFT Collection Details */}
              </Text>
              <Flex
                w="full"
                justifyContent="center"
                alignItems="center"
                css={{
                  gap: '6px',
                }}
              >
                <Avatar src={data?.image_url} borderRadius="full" shadow="md" h="30px" w="30px" />
                <Flex
                  flexDir="row"
                  justifyContent="center"
                  alignItems="center"
                  css={{
                    gap: '6px',
                  }}
                >
                  <Text color={'gray.700'} fontSize={'sm'} textTransform={'uppercase'} fontWeight="bold">
                    {data?.collection.name}
                  </Text>
                  {/* <Text color={'gray.500'} fontSize={'xs'} textTransform={'uppercase'}>
                      {data?.schema_name}
                    </Text>
                    <Text color={'gray.500'} fontSize={'xs'} textTransform={'uppercase'}>
                      {data?.address.slice(0, 3)}....
                      {data?.address.slice(data?.address.length - 4, data?.address.length)}
                    </Text> */}
                </Flex>
              </Flex>
            </Stack>
          </Grid>
        </Box>
      </Center>
    </Fade>
  )
  // }
}

export default ProjectCard
