import React from 'react';
import { Helmet } from 'react-helmet';

function Head() {
  return (
    <Helmet>
      <title>Bezhistaminovo</title>
      <meta
        name="description"
        content="Bezhistaminovo je stranka pomahajuca ludom s histaminovou intoleranciou, kde mozu ludia hlasovat za jedla a recepty."
      />
      <meta name="keywords" content="histamin, bezhistaminovo, recepty, potraviny, alergie" />
      <meta name="og:url" content={window.location.origin} />
      <meta
        name="og:description"
        content="Bezhistaminovo je stranka pomahajuca ludom s histaminovou intoleranciou, kde mozu ludia hlasovat za jedla a recepty."
      />
    </Helmet>
  );
}

export default Head;
