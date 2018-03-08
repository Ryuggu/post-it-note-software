function getLocal()
{
    var notes = localStorage.getItem("noteList");

    if (notes != null)
    {
        return JSON.parse(notes);
    }
    else
    {
        return [];
    }
}



function setLocal(originNotes)
{
    var newNotes = JSON.stringify(originNotes);

    localStorage.setItem("noteList", newNotes);
}



function submitNote(inputText, inputDate, inputImportant, inputIcon)
{
  var originNotes = getLocal();
  var newNote = {
    text:      inputText,
    date:      inputDate,
    important: inputImportant,
    icon:      inputIcon
  };

  originNotes.push(newNote);

  setLocal(originNotes);
}


function buildList()

{
  var notes = getLocal();

  var ulElm = document.querySelector("ul");
  ulElm.innerHTML = "";

  for(var i = 0; i < notes.length; i++)
  {
    var liElm = document.createElement("li");
    var pElm = document.createElement("p");
    var btnEditElm = document.createElement("button")
    var btnDelElm = document.createElement("button")
    
    if(notes[i].important === true)
    {
      liElm.style.backgroundColor = "#800080";
      liElm.style.color = "#FFFFFF";
    }

    pElm.innerHTML = notes[i].text;
    pElm.classList.add("pinkUnicorn");

    liElm.appendChild(pElm);

    if(notes[i].date !== "")
    {
      var pDateElm = document.createElement("p");
      pDateElm.innerHTML = notes[i].date;
      liElm.appendChild(pDateElm);
    }

    ulElm.appendChild(liElm);
      
      
      
    liElm.appendChild(btnEditElm);
    liElm.appendChild(btnDelElm);
      
    btnDelElm.innerHTML = "Delete";
    btnDelElm.classList.add("delBtn");
      
    btnEditElm.innerHTML = "Edit";
    btnEditElm.classList.add("editBtn");
      
    btnEditElm.setAttribute("data-index",i)
    
    btnEditElm.addEventListener("click", function(event){
        var index = event.target.getAttribute("data-index");
        var note = getLocal();
        notes[index].text = "changed";
        setLocal(notes);
        buildList();
    });
      
  }
}



window.onload = function()
{
  buildList();
}



var submitBtn = document.querySelector("#addNote");

    submitBtn.addEventListener("click", function()
{
  var text = document.querySelector("#noteText");
  var important = document.querySelector("#noteImportant");
  var date = document.querySelector("#noteTime");
//  var icon = document.querySelector("#noteIcon");

  submitNote(text.value, date.value, important.checked, "");
  buildList();

  text.value = "";
  date.value = "";
  important.checked = false;
});
