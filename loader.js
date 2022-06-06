$(() => {
    // $('#etudId').val('192033028365');

    $('#loadB').click(() => {
        const etudId = $('#etudId').val();

        $.getJSON(`/JSONs/${etudId}.json`, ({ name, results }) => {
            $('#studName').html(name);

            results.forEach((result, i) => {
                const lecture = lectures[i];
                const elements = lectureElements(lecture.id);

                $('#' + elements.CC)?.val(result.CC);
                $('#' + elements.EXAM)?.val(result.Exam);
            });

            updateCalc(true);
        });
    }); // .click();
});