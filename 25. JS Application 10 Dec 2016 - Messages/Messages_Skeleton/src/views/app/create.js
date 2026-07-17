export async function createPage(ctx) {
    let recipients = [];

    async function onCreate(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const selectEl = form.querySelector('#msgRecipientUsername');
        const selectedOption = selectEl.options[selectEl.selectedIndex];
        const receiverId = selectedOption ? selectedOption.id : null;
        const item = {
            receiverId,
            receiverUsername: formData.get('recipient')?.trim(),
            message: formData.get('text')?.trim()
        };


        if (Object.values(item).some((x) => !x)) {
            return alert("All fields are required!");
        }

        try {
            await post("/app", item);
            e.target.reset();
            ctx.page.redirect('/');
        } catch (err) {
            alert(err.message);
        }
    }

    try {
        recipients = await get("/auth/recipients") || [];
    } catch (err) {
        alert(err.message);
    }

    ctx.render(template({ recipients, onCreate }));
}