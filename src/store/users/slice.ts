import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const DEFAULT_STATE = [
    {
        id: "1",
        name: "Peter Doe",
        email: "PeterDoe@gmail.com",
        github: "peterdoe"
      },
      {
          id: "2",
          name: "Fran Jasz",
          email: "FranJasz@gmail.com",
          github: "Franksx"
      },
      {
          id: "3",
          name: "Ricardo Ger",
          email: "riPeCHAZzR@gmail.com",
          github: "midudev"
      },
      {
        id: "4",
        name: "Agus Rodrigez",
        email: "AgzRRod@gmail.com",
        github: "messi"
    },
    {
        id: "5",
        name: "Brian Ruiz",
        email: "ruizbrian@gmail.com",
        github: "BrianRuizZ"
    },
]

export type UserId = string



export interface User {
    name: string,
    email: string,
    github: string
}

export interface UserWithId extends User {
    id: UserId;
}

const initialState: UserWithId[] = (()=>{
    const persistedState = localStorage.getItem("__redux__state__");
    if (persistedState) {
        return JSON.parse(persistedState).users;
    }
    return DEFAULT_STATE;
})();


export const usersSlice = createSlice ({
    name: 'users',
    initialState,
    reducers: {
        addNewUser: (state, action: PayloadAction<User>) => {
            const id = crypto.randomUUID()
            return [...state, {id, ...action.payload }]
        },
        deleteUserById: (state, action: PayloadAction<UserId>) => {
            const id = action.payload;
            return state.filter((user) => user.id !== id);
        },
    }
})

export default usersSlice.reducer

export const { addNewUser, deleteUserById } = usersSlice.actions