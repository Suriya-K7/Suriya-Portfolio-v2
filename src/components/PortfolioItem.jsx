import React, { useState } from "react";
import Close from "../assets/close.svg";
import { Zoom } from "react-awesome-reveal";
import parse from "html-react-parser";
import { FaGooglePlay } from "react-icons/fa";

const PortfolioItem = ({ img, title, details }) => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };
  return (
    <div className='portfolio__item'>
      <Zoom
        duration={500}
        triggerOnce='true'
      >
        <img
          src={img}
          alt='...'
          className='portfolio__img'
        />
      </Zoom>
      <div
        className='portfolio__hover'
        onClick={toggleModal}
      >
        <h3 className='portfolio__title'>{title}</h3>
      </div>
      {modal && (
        <div className='portfolio__modal'>
          <div className='portfolio__modal-content'>
            <img
              src={Close}
              alt='...'
              className='modal__close'
              onClick={toggleModal}
            />
            <h3 className='modal__title'>{title}</h3>
            <ul className='modal__list grid'>
              {details.map(({ icon, title, desc }, index) => {
                return (
                  <div key={index}>
                    <li className='modal__item'>
                      <span className='item__icon'>{icon}</span>
                      <div>
                        <span className='item__title'>{title}</span>
                        <span className='item__details'>
                          {title === "Preview : " || title === "Code : " ? (
                            parse(
                              `<a href="${desc}" target="_blank">${desc}</a>`
                            )
                          ) : title === "Description : " ? (
                            desc
                          ) : (
                            <div className='tech__used'>
                              {desc.split(", ").map((item, i) => (
                                <span
                                  key={i}
                                  className='tech__name'
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          )}
                        </span>
                      </div>
                    </li>
                    {title === "Preview : " && (
                      <Zoom
                        delay={300}
                        duration={500}
                        triggerOnce='true'
                        className='margintop'
                      >
                        <div className='modal__img__container'>
                          <div className='modal__live'>
                            <span>
                              <a
                                href={desc}
                                target='_blank'
                                className='logo__align'
                              >
                                <FaGooglePlay className='logo' />
                                <span>Live</span>
                              </a>
                            </span>
                          </div>
                          <img
                            src={img}
                            alt='...'
                            className='modal__img'
                          />
                        </div>
                      </Zoom>
                    )}
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioItem;
