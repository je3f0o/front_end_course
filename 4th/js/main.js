window.addEventListener("DOMContentLoaded", function () { "use strict";

const activities = [
    {
        action: 'Brunch this weekend?',
        username: 'Ali Conners',
        user_avatar_url: "https://img2.pngio.com/replace-default-user-account-avatar-in-windows-10-winhelponline-user-avatar-png-256_256.png",
        note: " I'll be in your neighborhood doing errands"
    },
    {
        action: 'Summer BBQ',
        username: 'to Alex, Scott, Jennifer',
        user_avatar_url: "https://img2.pngio.com/replace-default-user-account-avatar-in-windows-10-winhelponline-user-avatar-png-256_256.png",
        note: "Wish I could come out but I'm out of town this weekend"
    },
    {
        action: 'Oui Oui',
        username: 'Sandra Adams',
        user_avatar_url: "https://img2.pngio.com/replace-default-user-account-avatar-in-windows-10-winhelponline-user-avatar-png-256_256.png",
        note: "Do you have Paris recommendations? Have you ever been?"
    },
    {
        action: 'Birthday Gift',
        username: 'Trevor Hansen',
        user_avatar_url: "https://img2.pngio.com/replace-default-user-account-avatar-in-windows-10-winhelponline-user-avatar-png-256_256.png",
        note: "Have any ideas of what we should get Heidi for her birthday?"
    },
    {
        action: 'Recipe to try',
        username: 'Brian Holt',
        user_avatar_url: "https://img2.pngio.com/replace-default-user-account-avatar-in-windows-10-winhelponline-user-avatar-png-256_256.png",
        note: "We should eat this: Grapefruit, Squash, Corn, and Tomatillo tacos"
    },
];

const list_item_template = `<div class="md-list">
    <div class="md-list__content-wrapper">
        <img class="md-list__avatar">
        <div class="md-list__content">
            <div class="md-list__title"></div>
            <div class="md-list__subtitle"></div>
            <div class="md-list__description"></div>
            <div class="md-diviver"></div>
        </div>
    </div>
</div>
`;

    const fragment = new DocumentFragment();

    const list = document.createElement("div");
    list.classList.add("md-list");
    fragment.appendChild(list);

    const list_item_element = JeefoDOMParser.parse(list_item_template)[0];

    for (const activity of activities) {
        const list_item = list_item_element.cloneNode(true);

        const img         = list_item.querySelector(".md-list__avatar");
        const title       = list_item.querySelector(".md-list__title");
        const subtitle    = list_item.querySelector(".md-list__subtitle");
        const description = list_item.querySelector(".md-list__description");

        img.src                 = activity.user_avatar_url;
        title.textContent       = activity.action;
        subtitle.textContent    = activity.username;
        description.textContent = activity.note;

        list.appendChild(list_item);
    }

    const card = document.querySelector(".md-card");
    card.appendChild(fragment);
});