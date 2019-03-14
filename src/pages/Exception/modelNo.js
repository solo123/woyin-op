import React from 'react';
import { formatMessage } from 'umi/locale';
import Link from 'umi/link';
import Exception from '@/components/Exception';

const Model404 = () => (
  <Exception
    type="404"
    desc={formatMessage({ id: 'app.exception.description.Model404' })}
    linkElement={Link}
    backText={formatMessage({ id: 'app.exception.back' })}
  />
);

export default Model404;
