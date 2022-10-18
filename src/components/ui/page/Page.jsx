import { Helmet } from 'react-helmet-async';
import React from 'react';

export function Page({ children, title }) {
  return (
    <>
      <Helmet>
        <title>{`${title} | Ant Pack`}</title>
      </Helmet>

      {children}
    </>
  );
}
