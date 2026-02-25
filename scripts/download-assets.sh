#!/usr/bin/env bash
set -euo pipefail

BASE_URL="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public"
TARGET_DIR="public/assets"

mkdir -p "$TARGET_DIR/688302222532cfd3939198b2"

curl -L -o "$TARGET_DIR/688302222532cfd3939198b2/0f33cbc97_BlueMountainLogo.jpg" "$BASE_URL/688302222532cfd3939198b2/0f33cbc97_BlueMountainLogo.jpg"
curl -L -o "$TARGET_DIR/317fd6_AccessibleBathroom.jpg" "$BASE_URL/317fd6_AccessibleBathroom.jpg"
curl -L -o "$TARGET_DIR/9b3d8c_StiltzLift.png" "$BASE_URL/9b3d8c_StiltzLift.png"
curl -L -o "$TARGET_DIR/f49588477_Bruno-Elan-SRE-3050-Stairlift-Bottom-Of-Stairs-2.png" "$BASE_URL/f49588477_Bruno-Elan-SRE-3050-Stairlift-Bottom-Of-Stairs-2.png"
curl -L -o "$TARGET_DIR/673f08be2_Ramps.jpg" "$BASE_URL/673f08be2_Ramps.jpg"
curl -L -o "$TARGET_DIR/10bde6_Handrails2.jpg" "$BASE_URL/10bde6_Handrails2.jpg"
curl -L -o "$TARGET_DIR/4239901fe_WheelchairLift-harmar-highlanderii-l-bap-lpr.jpg" "$BASE_URL/4239901fe_WheelchairLift-harmar-highlanderii-l-bap-lpr.jpg"
curl -L -o "$TARGET_DIR/152233e36_kohlrChoreograph2.png" "$BASE_URL/152233e36_kohlrChoreograph2.png"
curl -L -o "$TARGET_DIR/523f79347_KohlerWalk-inTub1.jpg" "$BASE_URL/523f79347_KohlerWalk-inTub1.jpg"
curl -L -o "$TARGET_DIR/4cffb52aa_Wet-Roombyhttps-motionspotcouk.jpg" "$BASE_URL/4cffb52aa_Wet-Roombyhttps-motionspotcouk.jpg"
curl -L -o "$TARGET_DIR/531adeaa4_SafteyAccessibilityUpdatesCredit-LameBlackLamb.jpg" "$BASE_URL/531adeaa4_SafteyAccessibilityUpdatesCredit-LameBlackLamb.jpg"
curl -L -o "$TARGET_DIR/8126875ed_quick-installation-feature.png" "$BASE_URL/8126875ed_quick-installation-feature.png"
curl -L -o "$TARGET_DIR/113a19b8d_Theinvisibleelevator.png" "$BASE_URL/113a19b8d_Theinvisibleelevator.png"
curl -L -o "$TARGET_DIR/68aa89b09_Smallfootprint.png" "$BASE_URL/68aa89b09_Smallfootprint.png"
curl -L -o "$TARGET_DIR/dce936dd7_smooth-and-quiet-ride-feature.png" "$BASE_URL/dce936dd7_smooth-and-quiet-ride-feature.png"
curl -L -o "$TARGET_DIR/8b4dc3927_built-in-safety-feature.png" "$BASE_URL/8b4dc3927_built-in-safety-feature.png"
curl -L -o "$TARGET_DIR/31d7d12e7_Wheelchairfriendlyoption2.png" "$BASE_URL/31d7d12e7_Wheelchairfriendlyoption2.png"
curl -L -o "$TARGET_DIR/9a12b85ce_duo-alta-logo.png" "$BASE_URL/9a12b85ce_duo-alta-logo.png"
curl -L -o "$TARGET_DIR/9b4f43dec_DuoAltaPhoto.png" "$BASE_URL/9b4f43dec_DuoAltaPhoto.png"
curl -L -o "$TARGET_DIR/20a8f01ea_trio-alta-logo.png" "$BASE_URL/20a8f01ea_trio-alta-logo.png"
curl -L -o "$TARGET_DIR/c08f4c98f_TrioAltaPhoto.png" "$BASE_URL/c08f4c98f_TrioAltaPhoto.png"
curl -L -o "$TARGET_DIR/f75325b4e_Homeliftherosectionphoto1.png" "$BASE_URL/f75325b4e_Homeliftherosectionphoto1.png"
curl -L -o "$TARGET_DIR/81a88eabb_Stiltz-US-Duo-Trio-Alta-Brochure-11-01-23-WEB.pdf" "$BASE_URL/81a88eabb_Stiltz-US-Duo-Trio-Alta-Brochure-11-01-23-WEB.pdf"
curl -L -o "$TARGET_DIR/2914844b0_BrunoWebsitePhoto.jpg" "$BASE_URL/2914844b0_BrunoWebsitePhoto.jpg"

echo "Downloaded assets to $TARGET_DIR"
