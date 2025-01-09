/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-param-reassign */
import React from 'react';

const ItemsWrapper = ({
  items, 
  name, 
  text,
  handleUnselect, 
  showingSelection,
}) => {
  // const parentRef = useRef(null);
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // const [visibleItems, setVisibleItems] = useState([]);
  // const [notRenderedCount, setNotRenderedCount] = useState(0);

  // useEffect(() => {
  //   const parentElement = parentRef.current;
  //   const boxWidth = parentElement.clientWidth - 50;
  //   let accumulatedWidth = 0;
  //   let count = 0;
  //   const gapWidth = 4;

  //   const tempContainer = document.createElement('div');

  //   tempContainer.style.visibility = 'hidden';
  //   tempContainer.style.position = 'absolute';
  //   tempContainer.style.top = '-9999px';
  //   tempContainer.style.left = '-9999px';

  //   document.body.appendChild(tempContainer);

  //   const tempElementsWidths = items.map((item) => {
  //     const text = item?.name || item?.title;
  //     const tempElement = document.createElement('span');
  //     tempElement.className = 'wh-autocomplete-selected-multiple-text';
  //     tempElement.textContent = text;
  //     tempContainer.appendChild(tempElement);
  //     return tempElement.offsetWidth;
  //   });

  //   for (let i = 0; i < items.length; i++) {
  //     const gap = gapWidth * i;
  //     const tempElementWidth = tempElementsWidths[i];

  //     if (accumulatedWidth + tempElementWidth + gap > boxWidth) {
  //       break;
  //     }

  //     accumulatedWidth += tempElementWidth + gap;
  //     count += 1;
  //   }

  //   document.body.removeChild(tempContainer); // Remove the temporary container

  //   setVisibleItems(items.slice(0, count));
  //   setNotRenderedCount(items.length - count);
  // }, [items, windowWidth]);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setWindowWidth(window.innerWidth);
  //   };

  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  // const notSelectedValues = items.slice(visibleItems.length)
  //   .map(({ value }) => value);

  return (
    <div className="wh-autocomplete-text-wrapper">
      <span className='wh-autocomplete-selected-multiple-text'>
        {items.length > 1 ? (
          `${text} - ${items.length}`
        ) : (
          items?.[0]?.name || items?.[0]?.title
        )}
      </span>
      {/* {visibleItems.map((item, index) => {
        const currentId = `text ${index.toString()} ${name}`;
        const text = item?.name || item?.title;

        return (
          <span
            className={`wh-autocomplete-selected-multiple-text ${showingSelection ? 'selection-remove-option' : ''}`}
            key={currentId}
            id={currentId}
            onClick={() => {
              if (showingSelection) {
                handleUnselect([item.value]);
              }
            }}
          >
            {text}
          </span>
        );
      })}
      {notRenderedCount > 0 ? (
        <span
          className={`wh-autocomplete-selected-multiple-text ${showingSelection ? 'selection-remove-option' : ''}`}
          onClick={() => {
            if (showingSelection) {
              handleUnselect(notSelectedValues);
            }
          }}
        >
          {`+${notRenderedCount}...`}
        </span>
      ) : null} */}
    </div>
  );
};

export default ItemsWrapper;
