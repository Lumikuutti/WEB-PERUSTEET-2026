type Course = {
    name: string;
    price: string;
    diets: string;
}

type dailyMenu = {
    courses: Course[];
}

type day = {
    date: string,
    courses: Course[]
}

type weeklyMenu = {
    days: day[]

}

export { dailyMenu, weeklyMenu };
