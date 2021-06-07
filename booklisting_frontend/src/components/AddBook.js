import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const AddBook = (props) => {
    let { bookid = '' } = useParams();
    let history = useHistory();
    const [errorFields, setErrorFields] = useState({name: false, isbn: false, authorId: false});
    const [formData, setFormData] = useState({name: "", isbn: "", authorId: ""});
    const [selectOptions, setSelectOptions] = useState([]);
    const [btnText, setBtnText] = useState(bookid? 'Save' : 'Add');

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

      const AddBook = async (bookData) => {
  
        var headers = new Headers();
        headers.append("Content-Type", "application/json");

        var raw = JSON.stringify({...bookData});
    
        var requestOptions = {
          method: 'POST',
          headers: headers,
          body: raw
        };
    
        return await fetch(`http://localhost:8080/book`, requestOptions)
          .then(response => response.json())
          .then(data => {
            let {bookInfo: {bookId}} = data;
              if(bookId){
                history.push('/books')
              } 
           })
           .catch(error => console.log("Error while adding book"));
        }


        const UpdateBook = async (bookData) => {
  
            var headers = new Headers();
            headers.append("Content-Type", "application/json");
    
            var raw = JSON.stringify({...bookData});
        
            var requestOptions = {
              method: 'PUT',
              headers: headers,
              body: raw
            };
        
            return await fetch(`http://localhost:8080/book/${bookid}`, requestOptions)
              .then(response => response.json())
              .then(data => {
                let {bookUpdateStatus} = data;
                  if(bookUpdateStatus){
                    history.push('/books')
                  } 
               })
               .catch(error => console.log("Error while updating book"));
            }

        const fetchAuthors = async () => {
  
          var headers = new Headers();
          headers.append("Content-Type", "application/json");
      
          var requestOptions = {
            method: 'GET',
            headers: headers
          };
      
          return await fetch(`http://localhost:8080/authors`, requestOptions)
            .then(response => response.json())
            .then(data => {
              let {authorList} = data;
                if(authorList.length > 0){
                    setSelectOptions(authorList);
                } 
            })
            .catch(error => console.log("Error while fetching author list"));
          }

        const fetchBookById = async () => {

          var headers = new Headers();
          headers.append("Content-Type", "application/json");
      
          var requestOptions = {
            method: 'GET',
            headers: headers
          };
      
          return await fetch(`http://localhost:8080/book/${bookid}`, requestOptions)
            .then(response => response.json())
            .then(data => {
              let {bookInfo: {bookId, name, isbn, authorData}} = data;
                if(bookId){
                    let { authorId } = authorData;
                    let editBookData = {
                        name,
                        isbn,
                        authorId
                    }
                    setFormData({...editBookData});
                } 
              })
              .catch(error => console.log("Error while fetching book"));
          }

          const submitReferenceForm = () => {
            let errorItems = {name: false, isbn: false, authorId: false};
            let submitData = formData;
            let { name, isbn, authorId } = submitData;
            if(!name){
                errorItems.name = true
            }
            if(!isbn){
                errorItems.isbn = true
            }

            if(!authorId){
              errorItems.authorId = true
            }
        
            if (errorItems.name || errorItems.isbn || errorItems.authorId) {
                setErrorFields(errorItems);
                return;
            } else {
                setErrorFields({name: false, isbn: false, authorId: false});
                onFinalSubmit();
            }
        };
    

      const onFinalSubmit = async () => {
        let submitData = formData;
        if (bookid) {
            setBtnText("Updating");
            await UpdateBook({...submitData})
        } else {
            setBtnText("Adding");
            await AddBook({...submitData})
        }
      };

      useEffect(() => {
        fetchAuthors();
        if (bookid) {
            fetchBookById();
        }   
      }, [bookid]);

    return (
        <form>
        <h1>{bookid ? 'Update' : 'Add'} Book</h1>
        <p>Enter book's name:</p>
        <input
            type='text'
            name='name'
            value={formData['name']}
            onChange={handleChange}
        />
        {errorFields.name && (
            <>
                <br/>
                <span className="error-class">Empty name</span>
            </>
        )}
        <p>Enter book's isbn:</p>
        <input
            type='text'
            name='isbn'
            value={formData['isbn']}
            onChange={handleChange}
        />
        {errorFields.isbn && (
            <>
                <br/>
                <span className="error-class">Empty isbn</span>
            </>
        )}
        <p>Select author:</p>
        <select
          onChange={handleChange}
          name='authorId'
        >
          <option disabled value="" selected={formData['authorId'] == ""}>Select</option>
          {selectOptions.map((ops, inx) => {
            return (
              <option value={ops.authorId} selected={ops.authorId == formData['authorId']}>
                {`${ops.firstName}`}
              </option>
            );
          })}
        </select>
        {errorFields.authorId && (
            <>
                <br/>
                <span className="error-class">Select author</span>
            </>
        )}
        <p></p>
        <br/>
        <button type="button" onClick={submitReferenceForm} >{btnText}</button>
        </form>
    );
  }


export default AddBook