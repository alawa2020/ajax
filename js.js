// 1 | AJAX: Objeto XMLHttpRequest
(()=>{
    const xhr = new XMLHttpRequest(),
    $xhr = document.getElementById("xhr"),
    $fragment = document.createDocumentFragment();

     
    xhr.addEventListener("readystatechange",e=>{
        if(xhr.readyState !== 4) return;
        //console.log(xhr);

        

        if(xhr.status >= 200 && xhr.status < 300){
            
            //.log("exito")
            
            //esta mi json
            let json = JSON.parse(xhr.responseText);
            //console.log(json)

            json.forEach(el=>{
                const $li = document.createElement("li");
                $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
                $fragment.appendChild($li);
            });

            $xhr.appendChild($fragment)


        }else{
            let message = xhr.statusText || "ocurrio un error"
            $xhr.innerHTML = `Error: ${xhr.status}:${message}`


            console.log("error")
        }
        

    })

    xhr.open("GET","https://jsonplaceholder.typicode.com/users");

    xhr.send();

})();


/* ************************************** FETCH ****************************************** */

// 2| API Fetch
(()=>{
    const $fetch = document.getElementById("fetch"),
    $fragment = document.createDocumentFragment();

    //por defecto get
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(res=>{
        //console.log(res)
        return res.ok ? res.json() : Promise.reject(res);
    })
    .then(json=>{
        //console.log(json)

        json.forEach(el=>{
            const $li = document.createElement("li");
            $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
            $fragment.appendChild($li);
        });

        $fetch.appendChild($fragment)

    })
    .catch(err=>{
        //console.log("Estamos en el error", err)
        let message = err.statusText || "ocurrio un error"
        $fetch.innerHTML = `Error: ${err.status}:${message}`
    })
    .finally(
       //console.log("Este mensaje siempre se ejecuta")
        );

})();


// 3| API Fetch + Async-Await
(()=>{
    const $fetchAsync = document.getElementById("fetch-async"),
    $fragment = document.createDocumentFragment();

    async function getData(){

        try {

            let res = await fetch("https://jsonplaceholder.typicode.com/users"),
            json = await res.json(); //await : espera antes de ejecutar la sgte linea

            //console.log(res, json)

            /* if(!res.ok){
                throw new Error ("error al solicitar los datos")
            } */
            if(!res.ok) throw {status: res.status,statusText:res.statusText}


            json.forEach(el=>{
                const $li = document.createElement("li");
                $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
                $fragment.appendChild($li);
            });
            $fetchAsync.appendChild($fragment)
            
        } catch (err) {
            let message = err.statusText || "ocurrio un error"
            $fetchAsync.innerHTML = `Error: ${err.status}:${message}`
            
        } finally{

        }

    }

    getData();


})();


/* ************************************** AXIOS ****************************************** */

// 4 | Libreria Axios

(()=>{
    const $axios = document.getElementById("axios"),
    $fragment = document.createDocumentFragment();

    axios.get("https://jsonplaceholder.typicode.com/users")
    .then(
        res=>{
            //console.log(res)
            let json = res.data;

            json.forEach(el=>{
                const $li = document.createElement("li");
                $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
                $fragment.appendChild($li);
            });
            $axios.appendChild($fragment)

        }
    )
    .catch(
        err =>{
            
            let message = err.response.statusText || "ocurrio un error"
            $axios.innerHTML = `Error: ${err.response.status}:${message}`
            //console.log(err.response);
        }
    )
    .finally(()=>{
        //console.log("se ejecutar siempre")
    });

})();

// 5 | Libreria Axios + async-await
(()=>{

    const $axiosAsync = document.getElementById("axios-async"),
    $fragment = document.createDocumentFragment();

    

    async function getData(){
        try {

            let res = await axios.get("https://jsonplaceholder.typicode.com/users"),
            json  = await res.data;

            console.log(res, json)

            json.forEach(el=>{
                const $li = document.createElement("li");
                $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
                $fragment.appendChild($li);
            });
            $axiosAsync.appendChild($fragment)



            
        } catch (err) {
            let message = err.response.statusText || "ocurrio un error"
            $axiosAsync.innerHTML = `Error: ${err.response.status}:${message}`
            
        } finally{
            console.log("simpre se ejecuta")
        }
    }
    getData()

})();


