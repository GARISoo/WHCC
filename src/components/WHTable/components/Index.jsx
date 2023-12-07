import React from 'react';

const Index = ({ visible, index, paddingLeft }) => {
  if (!visible) {
    return null;
  }

  return (
    <td className="wh-text-small" style={{ paddingLeft }}>
      {`${index}.`}
    </td>
  );
};

export default Index;
