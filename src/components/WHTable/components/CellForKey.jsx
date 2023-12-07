import React from 'react';
import defaultImg from '../assets/defaultProfile.jpeg';

const CellForKey = ({ name, content, id }) => {
  let cellContent;

  const isImage = name === 'image';
  const isIcon = name.includes('icon-');
  const isArray = Array.isArray(content);

  if (name === 'split') {
    const contentArr = content.split('||');

    return (
      <td className="wh-text-small">
        {contentArr[0]}
        <br />
        <hr style={{ margin: '0', color: 'black', opacity: '0.15' }} className="mt-1" />
        <span className="wh-text-gray" style={{ fontSize: '12px' }}>
          {contentArr[1]}
        </span>
      </td>
    );
  }

  if (name === 'children') {
    return null;
  }

  if (isImage) {
    cellContent = <img src={content || defaultImg} placeholder={defaultImg} alt="img" className="wh-table-td-image" />;
  } else if (isIcon) {
    const colorRegex = /color-(#[A-Fa-f0-9]{6}|#[A-Fa-f0-9]{3})/;
    const match = isIcon && content.match(colorRegex);
    const iconColor = (match && match?.length > 1) ? match[1] : '';

    cellContent = <i className={`${content} wh-table-td-icon`} style={{ color: iconColor }} />;
  } else if (isArray) {
    cellContent = (
      <div className="wh-table-td-wrapper">
        {content?.length ? content?.map((el, index) => (
          <span className="wh-text-small wh-table-multiple-entries" key={`${el} ${index.toString()} ${id}`}>
            {el}
          </span>
        )) : '-'}
      </div>
    );
  } else {
    cellContent = content || '-';
  }

  return (
    <td className="wh-text-small wh-td-multiple">
      {cellContent}
    </td>
  );
};

export default CellForKey;
