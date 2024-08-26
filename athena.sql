--- counts number of games released each year
SELECT year(date_parse(date_release, '%Y-%m-%d')) AS release_year, COUNT(*) AS games_count
FROM games
GROUP BY year(date_parse(date_release, '%Y-%m-%d'))
ORDER BY release_year ASC;


--- calculates average positive ration per tag
WITH unnested_metadata AS (
    SELECT
        app_id, t.tag
    FROM
        metadata
            CROSS JOIN UNNEST(tags) AS t (tag)
)
SELECT unnested_metadata.tag, round(avg(games.positive_ratio), 2) AS average_positive_ratio, count(*) AS data_points
FROM games JOIN unnested_metadata on games.app_id = unnested_metadata.app_id
GROUP BY unnested_metadata.tag
ORDER BY average_positive_ratio DESC


--- tag co-occurrence analysis: calculates average positive ratio based on the triplet of tags co-occurrence
WITH tag_tiplets AS (
    SELECT
        a.tag as tag1,
        b.tag as tag2,
        c.tag as tag3,
        metadata.app_id
    FROM metadata
             CROSS JOIN UNNEST(metadata.tags) AS a(tag)
             CROSS JOIN UNNEST(metadata.tags) AS b(tag)
             CROSS JOIN UNNEST(metadata.tags) AS c(tag)
    WHERE a.tag < b.tag AND b.tag < c.tag
)
SELECT
    tag1,
    tag2,
    tag3,
    COUNT(DISTINCT games.app_id) as co_occurrences,
    ROUND(AVG(games.positive_ratio), 2) as avg_positive_ratio
FROM tag_tiplets JOIN games ON tag_tiplets.app_id = games.app_id
GROUP BY tag1, tag2, tag3
HAVING COUNT(DISTINCT games.app_id) > 1000
ORDER BY co_occurrences DESC

--- tag co-occurrence analysis: calculates average positive ratio based on the triplet of tags co-occurrence
WITH platform_counts AS (
    SELECT
        COUNT(*) AS total_games,
        SUM(CASE WHEN win THEN 1 ELSE 0 END) AS windows_games,
        SUM(CASE WHEN mac THEN 1 ELSE 0 END) AS mac_games,
        SUM(CASE WHEN linux THEN 1 ELSE 0 END) AS linux_games
    FROM games
)
SELECT 'Windows' AS platform, windows_games AS games_supported, ROUND((windows_games * 100.0 / total_games),2) AS percentage
FROM platform_counts
UNION ALL
SELECT 'Mac' AS platform, mac_games AS games_supported, ROUND((mac_games * 100.0 / total_games),2) AS percentage
FROM platform_counts
UNION ALL
SELECT 'Linux' AS platform, linux_games AS games_supported, ROUND((linux_games * 100.0 / total_games),2) AS percentage
FROM platform_counts
ORDER BY percentage DESC

