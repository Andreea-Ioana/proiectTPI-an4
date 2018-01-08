$(document).ready(function () { //inainte sa se rulleze js asteapta sa se incarce tot documentul
    //variabila in care se vor stoca raspunsurile alese
    var answers = {}; //obiect gol
    //raspunsurile corecte la chestionar
    var correctAnswers = {
        "tab-1": "radio1a",
        "tab-2": "radio2b",
        "tab-3": "radio3b",
        "tab-4": "radio4b"
    };

    // Initiaza modal
    var sunModal = $("#sunModal"); //retii in varianbila sunModal elementul html cu id-ul sunModal
    var planetModal = $("#planetModal"); //tine loc de document.getElementbyId
    var sun = $("#sun");
    var saturn = $("#saturn");
    var mercury = $("#mercury");
    var venus = $("#venus");
    var earth = $("#earth");
    var mars = $("#mars");
    var jupiter = $("#jupiter");
    var uranus = $("#uranus");
    var neptune = $("#neptune");

    // Initiaza variabila closeModal care va inchide modalul
    var closeModal = $(".close"); //functia returneaza ca vector toate elementele ce au clasa "close" closeModal[0], clodeModal[1]

    // Adauga eveniment pentru deschiderea modalului Soare 
    sun.click(function () {
        $(sunModal).css("display", "block"); //apare parintele sunModal
    })
    // Adauga eveniment pentru deschiderea modalului Saturn
    saturn.click(function () {
        $(planetModal).css("display", "block"); //iti apare modalul fara content
        $("#planetModal li[data-section=section6]").click(); //cand dau clcik pe saturn , el defapt simuleaza un click pe saturn din meniul hamburger, aici apare content-ul
    
    })

    // Adauga eveniment pentru deschiderea modalului Mercur
    mercury.click(function () {
        $(planetModal).css("display", "block");
        $("#planetModal li[data-section=section1]").click(); //jquery
    })
    // Adauga eveniment pentru deschiderea modalului Venus
    venus.click(function () {
        $(planetModal).css("display", "block"); //face sa apara doar casuta si nu content-ul!
        //selectez planetModal si prin functia css ii dau display block
        $("#planetModal li[data-section=section2]").click(); //$() e o functie  care selecteaza ceva, aici selecteaza planeta si face sa apara content-ul modalului 
    })
    // Adauga eveniment pentru deschiderea modalului Pamant
    earth.click(function () {
        $(planetModal).css("display", "block");
        $("#planetModal li[data-section=section3]").click();
    })
    // Adauga eveniment pentru deschiderea modalului Marte
    mars.click(function () {
        $(planetModal).css("display", "block");
        $("#planetModal li[data-section=section4]").click();
    })
    // Adauga eveniment pentru deschiderea modalului Jupiter
    jupiter.click(function () {
        $(planetModal).css("display", "block");
        $("#planetModal li[data-section=section5]").click();
    })
    // Adauga eveniment pentru deschiderea modalului Uranus
    uranus.click(function () {
        $(planetModal).css("display", "block");
        $("#planetModal li[data-section=section7]").click();
    })
    // Adauga eveniment pentru deschiderea modalului Neptun
    neptune.click(function () {
        $(planetModal).css("display", "block");
        $("#planetModal li[data-section=section8]").click();
    })

    // Adauga eveniment pentru inchiderea modalelor prin variabila span
    $(closeModal[0]).click(function () {
        $(sunModal).css("display", "none"); //cand dai click pe X se inchide modalul, aici nu ma avut nevoie de event
    })

    $(closeModal[1]).click(function () {
        $(planetModal).css("display", "none");
    })

    // Adauga eveniment pentru inchiderea modalului la apasarea unei zone exterioare acestuia
    $('.modal').click(function (event) { //onclick e evenimentul
        if ($(event.target).is(sunModal)) { //event.target si sunModal sunt obiecte, de aia le verific asa si nu cu ==
            $(sunModal).css("display", "none"); //cand dau click inafara modalului se inchide; daca dau click in interiorul modalului defapt dau click pe body sau header si deaia nu se inchide modalul
        }
        if ($(event.target).is(planetModal)) {
            $(planetModal).css("display", "none");
        }
    })


    //Asignarea valorilor raspunsurilor alese in variabila answers
    //answers are treaba doar cu raspunsurile chestionarului
    $(".radioAnswers").click(function () {
        var clickedID = this.id;
        answers[$(this).closest(".current").attr("id")] = this.id; //tab2-radio1a de exemplu
        //selectez elementul this, caut in parintii lui elementul cu clasa parrent si ii iau atributul (attr) id (ex: pe tabul 2 raspunsul apasat este c)) 
        $(this).closest(".answers").siblings(".nextButton").css("display", "inline-block");
        //this=radio, ma duc in parintele lui, apoi in fratii parintelui si caut pana cand gasesc clasa .nextButton
        if ($(this).closest(".tab-content").is("#tab-4")) { //closest - cel mai apropriat parinte cu clasa .tab-content
            $(this).closest(".answers").siblings(".submitButton").css("display", "inline-block");
        }
    });

    //Schimbarea taburilor prin actionarea butonului NEXT
    $(".nextButton").click(function () {
        $(".tab-content").removeClass("current"); // ia toate tab contenturile si le scoatye clasa current 
        $($(this).closest(".tab-content").next(".tab-content")).addClass("current"); //adauga clasa current pe tabul urmator
        //this=butonul de next, se duce in parinti, ve de care e tab-content si seteaza clasa current pe utmatorul tab-content
    });


    //Schimbarea taburilor prin actionarea butonului PREVIOUS
    //la fel ca mai sus
    $(".prevButton").click(function () {
        $(".tab-content").removeClass("current");
        $($(this).closest(".tab-content").prev(".tab-content")).addClass("current");
    });


    //Evenimentul pentru actionarea butonului SUBMIT
    $(".submitButton").click(function () {
        var currentTab = $(this).closest(".tab-content");
        currentTab.removeClass("current");
        currentTab.next().addClass("current");

        var countCorrect = 0;
        for (var answer in answers) {
            if (answers[answer] == correctAnswers[answer]) {
                countCorrect++;
            }
        }

        $("#tab-5 .answers").append("<h2>You have answered " + countCorrect + "/4 questions correctly.</h2>")


    });

    //Corelarea sectiunilor din meniu, cand dai click pe mercury din meniu sa te duca acolo
    $("ul.menu li").click(function () {
        var section_id = $(this).attr("data-section");

        $("ul.menu li").removeClass("current");
        $(".section-content").removeClass("current");

        $(this).addClass("current");
        $("#" + section_id).addClass("current");
    });

    //Eveniment pentru interactiunea cu utilizatorul - alegerea orbitei si a vitezei planetelor
    $(".apply").click(function () {
        var planet = $(this).attr("data-submit"); //variabila in care se stocheaza id ul planetei pe care se face click
        var orbit = $(this).siblings(".chooseOrbit").children("input[type=radio]:checked").attr("id"); //variabila in care se stocheaza  optiunea de schimbare a orbitei
        //this=buton apply, se duce in siblings si cauta elem cu clasa chooseOrbit si acestuia ii cauta copilul de tip radio care este selectat si ii ia id-ul 
        var speed = $(this).siblings(".speed").val(); //variabila in care se stocheaza viteza introdusa de utilizator 
        
        $('#'+planet).css("animation", orbit + " " + speed + "s linear infinite"); // modificarea codului css pentru efectuarea schimbarilor in baza datelor introduse
        //toate functiile .css modifica fisierul html
    });

});