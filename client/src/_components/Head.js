import React from 'react';
import { Helmet } from 'react-helmet';

function Head() {
  return (
    <Helmet>
      <title>Bezhistaminovo</title>
      <meta
        name="description"
        content="Bezhistaminovo je stranka pomahajuca ludom s histaminovou intoleranciou, kde mozu ludia hlasovat za jedla a recepty ci neuskodili"
      />
    </Helmet>
  );
}

export default Head;
