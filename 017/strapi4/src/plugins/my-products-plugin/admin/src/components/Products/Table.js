import React from "react";
import { Table, Thead, Tbody, Tr, Td, Th } from "@strapi/design-system/Table";
import { Box } from "@strapi/design-system/Box";
import { Typography } from "@strapi/design-system/Typography";
import { Flex } from "@strapi/design-system/Flex";
import { IconButton } from "@strapi/design-system/IconButton";
import Trash from "@strapi/icons/Trash";

const ProductTable = ({ products, onDelete }) => {
  return (
    <Table colCount={3} rowCount={products.length} style={{ overflow: "auto" }}>
      <Thead>
        <Tr>
          <Th>
            <Typography variant="sigma">ID</Typography>
          </Th>
          <Th>
            <Typography variant="sigma">Product Name</Typography>
          </Th>
          <Th>
            <Typography variant="sigma">Created At</Typography>
          </Th>
          <Th>
            <Typography variant="sigma">Updated At</Typography>
          </Th>
          <Th>
            <Typography variant="sigma">Delete</Typography>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {products.map((entry) => (
          <Tr key={`${entry.id}-${entry.name}`}>
            <Td>
              <Typography textColor="neutral800">{entry.id}</Typography>
            </Td>
            <Td>
              <Typography variant="delta" textColor="neutral800">
                {entry.name}
              </Typography>
            </Td>
            <Td>
              <Typography textColor="neutral800">{entry.createdAt}</Typography>
            </Td>
            <Td>
              <Typography textColor="neutral800">{entry.updatedAt}</Typography>
            </Td>
            <Td>
              <Flex>
                <Box paddingLeft={1}>
                  <IconButton
                    onClick={() => onDelete(entry.id)}
                    label="Delete"
                    noBorder
                    icon={<Trash />}
                  />
                </Box>
              </Flex>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default ProductTable;
