const checkFileChange = () => {
    fetch(`/check-file-changes/filename=${window.location.href}`)
        .then(res => res.json())
        .then(data => {
            if(data.changed){
                location.reload();
            };
        });
};

setInterval(checkFileChange, 1000);


