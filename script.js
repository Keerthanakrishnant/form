async function submitform(){
    let name=document.getElementById("name").value
    console.log("name:",name)
    let email=document.getElementById("email").value
    console.log("email:",name)
    let phone=document.getElementById("phone").value
    console.log("phone:",name)
    let university=document.getElementById("university").value
    console.log("university:",name)
    let study=document.getElementById("study").value
    console.log("study:",name)
    let languages=document.getElementById("languages").value
    console.log("languages:",name)
    
    let checkbox= document.querySelectorAll('input[name="options"]:checked');
            let selectedoptions = [];
            checkbox.forEach((checkbox) => {
                selectedoptions.push(checkbox.value);
            });
            console.log("selectedOptions:", selectedoptions);


    let data={
      
            name,
            email,
            phone,
            university,
            study,
            languages,
            options:selectedoptions,

        }
        
   let json_data=JSON.stringify(data)
   try {
       let response=await fetch('http://localhost:3000/submit',{
           method:"POST",
           headers:{
               "Content-Type":"application/json"
           },
           body:json_data,
       })
       if (response.ok) {
       
        let exportResponse = await fetch('http://localhost:3000/export');
        if (exportResponse.ok) {
            const blob = await exportResponse.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'data.xlsx';
            document.body.appendChild(a);
            a.click();
            a.remove();
        } else {
            console.error('Failed to export data');
        }
    } else {
        console.error('Failed to submit form');
    }
} catch (error) {
    console.error('Error:', error);
}
}

document.getElementById('form').addEventListener('submit', submitForm);
//        console.log("response:",response)
//    } catch (error) {
//        console.log("error:",error)
       
//    }}

