function LoadCombination(no,
                         design_situation,
                         items,
                         comment,
                         params)
{
    var items = typeof items !== 'undefined' ? items : [];

    var combination = engine.create_load_combination(no);
    combination.design_situation = design_situation;

    for (var i = 0; i < items.length; i++)
    {
        combination.items[i + 1].load_case = items[i];
    }

    set_comment_and_parameters(combination, comment, params);
    return combination;
}
