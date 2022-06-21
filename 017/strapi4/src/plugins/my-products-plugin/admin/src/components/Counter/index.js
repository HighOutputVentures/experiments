import React, { useState } from "react";
import { Flex } from "@strapi/design-system/Flex";
import { Button } from "@strapi/design-system/Button";
import { Typography } from "@strapi/design-system/Typography";

export const Counter = () => {
  const [value, setValue] = useState(0);

  return (
    <Flex gap="30px">
      <Button onClick={() => setValue((value) => value + 1)}>Add</Button>
      <Typography variant="alpha">{value}</Typography>
    </Flex>
  );
};

export default Counter;
