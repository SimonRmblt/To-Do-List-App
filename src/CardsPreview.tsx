import DrawTask from "./TasksCards";
import React from "react";
import {ScrollView} from "react-native";

const CardsPreview = ({cards, cardsState, toggleTaskPopup}) => {
    return (
        <ScrollView>
            {cards.map((card: any, index: number) => {
                if (card.status !== cardsState) return null;
                return (
                    <DrawTask key={index} task={card} nbr={index} onPress={toggleTaskPopup}/>
                )
            })}
        </ScrollView>
    );
}

export default CardsPreview;