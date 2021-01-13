interface Response{
    token: string;
    user:{
        name: string;
        email: string;
    };
}

export function signIn(): Promise<Response>{
    return new Promise((resolve) => {

        setTimeout(() => {
            resolve({
                token: 'jashd',
                user: {
                    name: 'joao',
                    email: 'joao@hotmail.com',
                }
            });
        }, 2000);

    });
}