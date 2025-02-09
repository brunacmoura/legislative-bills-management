import pandas as pd

bills_df = pd.read_csv("data/bills.csv")
legislators_df = pd.read_csv("data/legislators.csv")
votes_df = pd.read_csv("data/votes.csv")
vote_results_df = pd.read_csv("data/vote_results.csv")


def process_legislators():
    legislator_votes = vote_results_df.groupby("legislator_id")["vote_type"].value_counts().unstack(fill_value=0)

    results = legislators_df.copy()
    results["supported_bills"] = results["id"].map(lambda x: int(legislator_votes.get(1, {}).get(x, 0)))
    results["opposed_bills"] = results["id"].map(lambda x: int(legislator_votes.get(2, {}).get(x, 0)))

    response = results[["id", "name", "supported_bills", "opposed_bills"]].to_dict(orient="records")

    return response


def process_bills():
    votes_merged = vote_results_df.merge(votes_df, left_on="vote_id", right_on="id")
    votes_merged = votes_merged.merge(legislators_df, left_on="legislator_id", right_on="id", how="left")

    bill_votes = votes_merged.groupby("bill_id")["vote_type"].value_counts().unstack(fill_value=0)

    supporters_dict = (
        votes_merged[votes_merged["vote_type"] == 1]
        .groupby("bill_id")["name"]
        .apply(list)
        .to_dict()
    )

    opposers_dict = (
        votes_merged[votes_merged["vote_type"] == 2]
        .groupby("bill_id")["name"]
        .apply(list)
        .to_dict()
    )

    results = bills_df.copy()
    results["supporters"] = results["id"].map(bill_votes.get(1, 0))
    results["opposers"] = results["id"].map(bill_votes.get(2, 0))
    results["supporter_names"] = results["id"].map(supporters_dict).apply(lambda x: x if isinstance(x, list) else [])
    results["opposer_names"] = results["id"].map(opposers_dict).apply(lambda x: x if isinstance(x, list) else [])

    results = results.merge(legislators_df, left_on="sponsor_id", right_on="id", how="left")
    results["name"] = results["name"].fillna("Not registered")

    response = results[["id_x", "title", "supporters", "opposers", "supporter_names", "opposer_names", "name"]].to_dict(orient="records")

    return response
