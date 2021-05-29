const d = document,
      $date = d.getElementById('date'),
      $cards = d.querySelector('.cards'),
      $template = d.getElementById('fecha-template').content,
      $fragment = d.createDocumentFragment();

const getAll = async () => {
    try{
        let res = await fetch('http://127.0.0.1:3000/fechas'),
        json = await res.json();
            

        json.forEach(fecha => {
            $template.querySelector('.card-header img').src = `../assets/images/${fecha.image}`;
            $template.querySelector('.card-header img').alt = fecha.date;
            $template.querySelector('.card-title').textContent = fecha.name;
            $template.querySelector('.card-description').textContent = fecha.desc;
            $template.querySelector('.card-footer').textContent = fecha.date;

            let $clone = d.importNode($template, true);
            $fragment.appendChild($clone);
        })
        
        $cards.appendChild($fragment);

        if(!res.ok) throw {status: res.status, statusText: res.statusText};

    }
    catch(err){
        let message = err.statusText || "Ocurrió un error";

        console.error(`Error ${err.status} : ${message}`)
    }
}
d.addEventListener('DOMContentLoaded', e => {
    getAll();
    

    d.addEventListener('keyup', e => {
        if(e.target === $date){
            
            ($date.value) ? $date.classList.add('active') : $date.classList.remove('active')

            let $card = d.querySelectorAll('.card');

            $card.forEach(f => {
                let $foot = f.querySelector('.card-footer').textContent.toLowerCase();

                ($foot.includes(e.target.value.toLowerCase()))
                ? f.classList.remove("filter")
                : f.classList.add("filter")
            })
        }
    })
})