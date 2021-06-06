import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const AddAuthor = (props) => {
    let { authorid = '' } = useParams();
    let history = useHistory();
    const [formData, setFormData] = useState({firstName: "", lastName: ""});
    const [btnText, setBtnText] = useState(authorid? 'Save' : 'Add');

    const handleChange = event => {
        const formDataCopy = { ...formData };
        if (event.hasOwnProperty('target')) {
          let {
            target: { name, value },
          } = event;
            formDataCopy[name] = value;
        } 
        setFormData(formDataCopy);
      };

      const AddAuthor = async (authorData) => {
  
        var headers = new Headers();
        headers.append("Content-Type", "application/json");

        var raw = JSON.stringify({...authorData});
    
        var requestOptions = {
          method: 'POST',
          headers: headers,
          body: raw
        };
    
        return await fetch(`http://localhost:8080/author`, requestOptions)
          .then(response => response.json())
          .then(data => {
            let {authorInfo: {authorId}} = data;
              if(authorId){
                history.push('/authors')
              } 
           })
           .catch(error => console.log("Error while adding author"));
        }


        const UpdateAuthor = async (authorData) => {
  
            var headers = new Headers();
            headers.append("Content-Type", "application/json");
    
            var raw = JSON.stringify({...authorData});
        
            var requestOptions = {
              method: 'PUT',
              headers: headers,
              body: raw
            };
        
            return await fetch(`http://localhost:8080/author/${authorid}`, requestOptions)
              .then(response => response.json())
              .then(data => {
                let {authorUpdateStatus} = data;
                  if(authorUpdateStatus){
                    history.push('/authors')
                  } 
               })
               .catch(error => console.log("Error while updating author"));
            }

        const fetchAuthorById = async () => {
  
            var headers = new Headers();
            headers.append("Content-Type", "application/json");
        
            var requestOptions = {
              method: 'GET',
              headers: headers
            };
        
            return await fetch(`http://localhost:8080/author/${authorid}`, requestOptions)
              .then(response => response.json())
              .then(data => {
                let {authorInfo: {authorId, firstName, lastName}} = data;
                  if(authorId){
                      let editAuthorData = {
                          firstName,
                          lastName
                      }
                      setFormData({...editAuthorData});
                  } 
               })
               .catch(error => console.log("Error while fetching author"));
            }

      const onFinalSubmit = async () => {
        let submitData = formData;
        if (authorid) {
            setBtnText("Updating");
            await UpdateAuthor({...submitData})
        } else {
            setBtnText("Adding");
            await AddAuthor({...submitData})
        }
      };

      useEffect(() => {
        if (authorid) {
            fetchAuthorById();
        }   
      }, [authorid]);

    return (
        <form>
        <h1>{authorid ? 'Update' : 'Add'} Author</h1>
        <p>Enter author's first name:</p>
        <input
            type='text'
            name='firstName'
            value={formData['firstName']}
            onChange={handleChange}
        />
        <p>Enter author's last name:</p>
        <input
            type='text'
            name='lastName'
            value={formData['lastName']}
            onChange={handleChange}
        />
        <p></p>
        <br/>
        <button type="button" onClick={onFinalSubmit} >{btnText}</button>
        </form>
    );
  }


export default AddAuthor