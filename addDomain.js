import React from 'react'

const AddDomain = ({bodyCopy}) => {
  //add domain name here from .env file etc
  const domain = process.env.BASE_URL;
  // const domain = '';
  const domain = '';
  const regex = /(?:src="|href=")((?!src="|href=")(.*?))(?=")/g;
  // processed field output from graphQL representing the WYSIWYG editor's string
  let str = bodyCopy;
  let linkList = str.match(regex)
  if(linkList){
    linkList.forEach(url => {
      // find links without .env domain and add prepend
      if (
        url.split('"')[1][0] === "/" &&
        url.split('"')[1].search(domain.split("/")[2]) === -1
      ) {
        // add the domain name to the link
        let newUrl = url.split('"')[0] + '"' + domain + url.split('"')[1];
        // change that instance in the string
        str = str.replace(url, newUrl);
      }
    });
  }
  return(
      <div dangerouslySetInnerHTML={{ __html: str}}></div>
  );
}

export default AddDomain;
