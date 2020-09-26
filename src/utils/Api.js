class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    checkStatus(res) {
        if (res.ok) {
            return res.json()
        }
        else { return Promise.reject(`Ошибка: ${res.status}`) }
    }

    getAppinfo() {
        return Promise.all([this.getInitialCards(), this.getUserInformation()])
    }

    // Получение массива карточек с сервера
    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers
        })
            .then(this.checkStatus)
    }

    // Метод для создания новой карточки 
    postNewCard(data) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            }),
        })
            .then(this.checkStatus)
    };
    // Метод для удаления карточки
    deleteThisCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: 'Delete',
            headers: this.headers
        })
            .then(this.checkStatus)
    }
    // Метод для получения инфы профиля
    getUserInformation() {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers,
        })
            .then(this.checkStatus)
    }
    //Метод для изменения инфы профиля
    setUserInfo(data) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            })

        }).then(this.checkStatus)

    }
    //Метод для изменения аватарки
    changeProfileAvatar(data) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: data.avatar
            })

        }).then(this.checkStatus)
    }
    // Лайкос

    changeLikeStatus(cardId, isLiked) {
        if (isLiked) {
            return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
                method: 'PUT',
                headers: this.headers
            }).then(this.checkStatus)
        } else if (!isLiked) {
            return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
                method: 'DELETE',
                headers: this.headers
            }).then(this.checkStatus)
        }
    }

}
export const apiProfile = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
    headers: {
        authorization: '60dbe103-3bf7-4b68-8dd7-d41370d9694c',
        'Content-Type': 'application/json'
    }

});