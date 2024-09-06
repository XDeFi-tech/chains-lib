import React from 'react';
import { Box, Collapse } from '@mui/material';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

export interface IHowTo {
  title: string;
  children: React.ReactNode;
}

const HowTo = (props: IHowTo) => {
  const [show, setShow] = React.useState(false);
  const handleClick = React.useCallback(() => {
    setShow((prev) => !prev);
  }, []);

  return (
    <Box sx={{ border: '1px solid' }}>
      <Box sx={{ cursor: 'pointer', padding: '1em' }} onClick={handleClick}>
        How to {props.title}
      </Box>

      <Collapse in={show}>
        <SyntaxHighlighter
          language="typescript"
          style={dracula}
          showLineNumbers="true"
          customStyle={{ margin: 0 }}
        >
          {props.children}
        </SyntaxHighlighter>
      </Collapse>
    </Box>
  );
};

export default HowTo;
