import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Loader from './Loader';

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, showHideLoader, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      console.log("786 Here Clicked...");
      showHideLoader(true);
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    &#x25bc;
  </a>
));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
  ({ children, style, className, setShowLoader, dropDownItemList, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');
    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <Form.Control
          autoFocus
          placeholder="Type to filter cities..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.startsWith(value) || child.props.children.toLowerCase().startsWith(value),
          )}
        </ul>
      </div>
    );
  },
);

const DropDown = ({onSelectCallBack, dropDownItemList, showHideLoader}) => {
    
  useEffect(()=>{
    console.count("Drop Down Loaded");
  });

    return (
      <React.Fragment>
          <Dropdown onSelect={onSelectCallBack}  show="true">
          
              <Dropdown.Menu as={CustomMenu} dropDownItemList={dropDownItemList}>
                  {
                      dropDownItemList.map((item)=>(
                          <Dropdown.Item eventKey={item.id} key={item.id}>{item.nm}</Dropdown.Item>
                      ))
                  }
              </Dropdown.Menu>
          </Dropdown>
        </React.Fragment>
    );
};

export default DropDown;